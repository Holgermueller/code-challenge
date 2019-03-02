const app = angular.module("Candidate.App", []);

app.component("itmRoot", {
  controller: class {
    constructor() {
      this.candidates = [
        { name: "Puppies", votes: 10 },
        { name: "Kittens", votes: 12 },
        { name: "Gerbils", votes: 7 }
      ];
    }

    onVote(candidate) {
      console.log(`Vote for ${candidate.name}`);
      candidate.votes = candidate.votes + 1;

      function addAllVotes(total, num) {
        return total + num;
      }

      let totaledVotes = this.candidates
        .map(getVotes => getVotes.votes)
        .reduce(addAllVotes);

      this.candidates.forEach(
        singleCandidate =>
          (singleCandidate.percentage =
            Math.round((singleCandidate.votes / totaledVotes) * 100) + "%")
      );

      let singleCandidateVotes = candidate.votes;

      candidate.percentage =
        ((singleCandidateVotes / totaledVotes) * 100).toFixed() + "%";
    }

    onAddCandidate(candidate) {
      console.log(`Added candidate ${candidate.name}`);
    }

    onRemoveCandidate(candidate) {
      console.log(`Removed candidate ${candidate.name}`);
    }
  },
  template: `
        <h1>Which candidate brings the most joy?</h1>
            
        <itm-results 
            candidates="$ctrl.candidates">
        </itm-results>

        <itm-vote 
            candidates="$ctrl.candidates"
            on-vote="$ctrl.onVote($candidate)">
        </itm-vote>

        <itm-management 
            candidates="$ctrl.candidates"
            on-add="$ctrl.onAddCandidate($candidate)"
            on-remove="$ctrl.onRemoveCandidate($candidate)">
        </itm-management>
    `
});

app.component("itmManagement", {
  bindings: {
    candidates: "<",
    onAdd: "&",
    onRemove: "&"
  },
  controller: class {
    constructor() {
      this.newCandidate = {
        name: "",
        votes: 0
      };
    }

    submitCandidate(candidate) {
      this.onAdd({ $candidate: candidate });
      this.errorText = "";

      let potentialCandidate =
        this.newCandidate.name.charAt(0).toUpperCase() +
        this.newCandidate.name.slice(1).toLowerCase();

      let candidatesAlreadyInList = this.candidates.map(
        candidateNames => candidateNames.name
      );

      this.newCandidate.name = potentialCandidate;

      switch (true) {
        case potentialCandidate === "":
          this.errorText = "YOU MUST ENTER A NAME.";
          this.newCandidate = { name: "", votes: 0 };
          break;

        case candidatesAlreadyInList.indexOf(potentialCandidate) > -1:
          this.errorText = "CANDIDATE ALREADY EXISTS.";
          this.newCandidate = { name: "", votes: 0 };
          break;

        default:
          this.candidates.push(this.newCandidate);
          this.newCandidate = { name: "", votes: 0 };
      }
    }

    removeCandidate(candidate) {
      this.onRemove({ $candidate: candidate });
      let index = this.candidates.indexOf(candidate);
      this.candidates.splice(index, 1);

      function addAllVotes(total, num) {
        return total + num;
      }

      let totaledVotes = this.candidates
        .map(getVotes => getVotes.votes)
        .reduce(addAllVotes);

      this.candidates.forEach(
        singleCandidate =>
          (singleCandidate.percentage =
            Math.round((singleCandidate.votes / totaledVotes) * 100) + "%")
      );
    }
  },
  template: `
        <h2>Manage Candidates</h2>

        <h3><button id="addToggleSwitch">Add New Candidate</button></h3>
        <form ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" novalidate>

            <input type="text" ng-model="$ctrl.newCandidate.name" placeholder="Candidate Name" required>

            <button type="submit" ng-click="$ctrl.addCandidate(candidate)">Add</button>
            <p ng-bind="$ctrl.errorText">Error:</p>
        </form>

        <h3><button id="removeToggleSwitch">Remove Candidate</button></h3>
        <ul id="removeContainer">
            <li ng-repeat="candidate in $ctrl.candidates" class="remove-candidate-item">
                <span ng-bind="candidate.name"></span>
                <button type="button" ng-click="$ctrl.removeCandidate(candidate)" class="remove-button">X</button>
            </li>
        </ul>
    `
});

app.component("itmVote", {
  bindings: {
    candidates: "<",
    onVote: "&"
  },
  controller: class {},
  template: `
        <h2>Cast your vote!</h2>

        <button type="button"
        class="vote-button"
            ng-repeat="candidate in $ctrl.candidates"
            ng-click="$ctrl.onVote({ $candidate: candidate })">
            <span ng-bind="candidate.name"></span>
        </button>
    `
});

app.component("itmResults", {
  bindings: {
    candidates: "<"
  },
  controller: class {},
  template: `
        <h2>Live Results</h2>
        <ul>
            <li ng-repeat="candidate in $ctrl.candidates | orderBy: '-votes' ">
                <span ng-bind="candidate.name"></span>
                <strong ng-bind="candidate.votes"></strong>
                <strong ng-bind="candidate.percentage"></strong>
            </li>
        </ul>
    `
});
