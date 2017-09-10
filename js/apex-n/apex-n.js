// *credit*
// used xephero's js as a base for this project as it's what i've been using
// thanks!

$(function() {
  "use strict";

  var rows = 10;
  var rdps_max = 0;


  function JobOrName(combatant) {
    combatant.JobOrName = combatant.Job || combatant.name;
    var egiSearch = combatant.JobOrName.indexOf("-Egi (");
    if (egiSearch != -1) {
      combatant.JobOrName = combatant.JobOrName.substring(0, egiSearch);
    } else if (combatant.JobOrName.indexOf("Eos (") == 0) {
      combatant.JobOrName = "Eos";
    } else if (combatant.JobOrName.indexOf("Selene (") == 0) {
      combatant.JobOrName = "Selene";
    } else if (combatant.JobOrName.indexOf("Carbuncle (") != -1) {
      combatant.JobOrName = "PET";
    } else if (combatant.JobOrName.indexOf("Autoturret (") != -1) {
      combatant.JobOrName = "rook";
    } else if (combatant.JobOrName.indexOf(" (") != -1) {
      combatant.JobOrName = "chocobo";
    }
    return combatant.JobOrName;
  };

  var mharray = [];
  var dmgarray = [];

  function update(e) {
    var encounter = e.detail.Encounter;
    var combatants = e.detail.Combatant;
    var htemplate = $('#header-source');
    var template = $('#combatant-source');
    var container = $('#overlay').clone();


    container.html('');

    var rdps = parseFloat(encounter.encdps);
    var names = Object.keys(combatants).slice(0, rows - 1);



    for (var i = 0; i < names.length; i++) {
      var combatant = combatants[names[i]];

      var maxHitDmg = (combatant.maxhit).match(/\d/g);
      maxHitDmg = maxHitDmg.join("");
      var splitMaxHit = (combatant.maxhit).split("-");
      var maxHitName = splitMaxHit[0];

      if (combatant.name == "Limit Break") {
        continue;
      }
      mharray.splice([i], 0, (combatant.name + "-" + maxHitName + "-" + maxHitDmg));
      dmgarray.splice([i], 0, parseInt(maxHitDmg));


    };

    function indexOfMax(arr) {
      if (arr.length === 0) {
        return -1;
      }

      var max = arr[0];
      var maxIndex = 0;

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
        }
      }

      return maxIndex;
    };

    var maxhitnolb = (mharray[indexOfMax(dmgarray)]);




    // sanity check
    if (!isNaN(rdps) && rdps != Infinity) {
      rdps_max = Math.max(rdps_max, rdps);
    }

    var header = htemplate.clone();
    if (encounter.encdps.length <= 7) {
      header.find('.encounterdps').text(encounter.encdps);
    } else {
      header.find('.encounterdps').text(encounter.ENCDPS);
    }
    header.find('.encountername').text(encounter.title);
    if (ignoreLimitBreak == true) {
      header.find('.maxhit').text(maxhitnolb);
    } else {
      header.find('.maxhit').text(encounter.maxhit);
    };
    header.find('.encountertime').text('Time ' + encounter.duration);

    // set inactive
    if (!e.detail.isActive) {
      rdps_max = 0;
      $('body').addClass('inactive');
    } else {
      $('body').removeClass('inactive');
    }

    container.append(header);

    var limit = Math.max(combatants.length, rows);
    /*var names = Object.keys(combatants).slice(0, rows - 1);*/
    var maxdps = false;


    for (var i = 0; i < names.length; i++) {
      var combatant = combatants[names[i]];
      if (partyLimitBreak == false) {
        if (combatant.name == "Limit Break") {
          continue;
        }
      }
      var row = template.clone();
      var heal = (parseInt(combatant.healed) / parseInt(encounter.healed) * 100).toFixed();
      var healPct = (isNaN(heal) ? "-" : heal);
      var dpsr = parseInt(combatant.encdps).toFixed();
      var dpsn = (isNaN(dpsr) ? "0" : dpsr);
      var critPct = (parseInt(combatant.crithits) / parseInt(combatant.swings) * 100).toFixed();

      if (!maxdps) {
        maxdps = parseFloat(combatant.encdps);
      }

      if (combatant.name == 'YOU') {
        combatant.name = yourname;
      }

      if (combatant.damage.length > 6) {
        combatant.damage = combatant.damage.substring(0, combatant.damage.length - 3) + 'K';
      }

      row.find('.dps').text(dpsn);
      row.find('.job-icon').html('<img src="images/grey/' + JobOrName(combatant) + '.png" onerror="$(this).attr(\'src\', \'images/grey/error.png\');">');
      row.find('.name').text(combatant.name);
      row.find('.statone').text("C: " + critPct + "%");
      row.find('.stattwo').text("DH: " + combatant.DirectHitPct);
      /*row.find('.damage').text(combatant.damage);*/
      row.find('.bar').css('width', ((parseFloat(combatant.encdps) / maxdps) * 100) + '%');
      if (combatant.Job != "") row.addClass("job-" + combatant.Job);
      if ((combatant.Job == "Sch") || (combatant.Job == "Ast") || (combatant.Job == "Whm") || (combatant.Job == "Cnj")) {
        row.find('.statone').text("H: " + healPct + "%");
        row.find('.stattwo').text("OH: " + combatant.OverHealPct);
      };

      container.append(row);
    }

    $('#overlay').replaceWith(container);
  }

  $(document).on('onOverlayDataUpdate', function(e) {
    update(e.originalEvent);
  });
  window.addEventListener('message', function(e) {
    if (e.data.type === 'onOverlayDataUpdate') {
      update(e.data);
    }
  });
});
