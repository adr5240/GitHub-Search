import {EventEmitter} from "events";

class RepositoryStore extends EventEmitter {
    constructor() {
        super();
        this.company = "";
        this.repos = {};
        this.currentRepo = {};
    }

    getCompany() {
        return this.company;
    }

    updateCompany(company) {
        this.company = company;
    }

    getCurrentRepo() {
        return this.currentRepo;
    }

    updateCurrentRepo(repo) {
        this.currentRepo = repo;
    }

    updateRepos(data) {
        this.repos = {};
        
        data.forEach((el) => {
            this.repos[el.name] = el;
        });
    }

    findRepo(name) {
        return this.repos[name];
    }

    emptyRepo() {
        this.currentRepo = {};
    }

    getLength() {
        return Object.keys(this.repos).length;
    }

    getAll() {
        return this.repos;
    }
}

const repositoryStore = new RepositoryStore;

export default repositoryStore;
