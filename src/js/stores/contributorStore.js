import {EventEmitter} from "events";

class ContributorStore extends EventEmitter {
    constructor() {
        super();
        this.contributors = {};
        this.person = {};
    }

    updateContributors(data) {
        this.contributors = {};

        data.forEach((el) => {
            this.contributors[el.login] = el;
        });
    }

    updateCurrentPerson(person) {
        this.person = person;
    }

    findPerson(name) {
        return this.contributors[name];
    }

    emptyPerson() {
        this.person = {};
    }

    getLength() {
        return Object.keys(this.contributors).length;
    }

    getAll() {
        return this.contributors;
    }
}

const contributorStore = new ContributorStore;

export default contributorStore;
