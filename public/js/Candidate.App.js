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

      let singleCandidateVotes = candidate.votes;
      let grabVotesFromArray = this.candidates.map(getVotes => getVotes.votes);

      function add(accumulator, a) {
        return accumulator + a;
      };

      let totaledVotes = grabVotesFromArray.reduce(add);

      let calculatedPercentage = ((singleCandidateVotes / totaledVotes) * 100).toFixed();

      candidate.percentage = calculatedPercentage + "%";

      console.log(calculatedPercentage);
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
        this.newCandidate.name.slice(1);
      let candidatesAlreadyInList = this.candidates.map(
        candidateNames => candidateNames.name
      );

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
      this.candidates.splice(this.candidate, 1);
    }
  },
  template: `
        <h2>Manage Candidates</h2>

        <h3>Add New Candidate</h3>
        <form ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" novalidate>

            <label>Candidate Name</label>
            <input type="text" ng-model="$ctrl.newCandidate.name" required>

            <button type="submit" ng-click="$ctrl.addCandidate(candidate)">Add</button>
        </form>

        <p ng-bind="$ctrl.errorText">Error:</p>

        <h3>Remove Candidate</h3>
        <ul>
            <li ng-repeat="candidate in $ctrl.candidates">
                <span ng-bind="candidate.name"></span>
                <button type="button" ng-click="$ctrl.removeCandidate(candidate)">X</button>
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
