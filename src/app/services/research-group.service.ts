import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResearchGroup } from '../models/researchGroup';

@Injectable({
  providedIn: 'root',
})
export class ResearchGroupService {
  serverIP: string = 'localhost';
  serverPort: number = 25000;

  researchGroupRouter: string = `http://${this.serverIP}:${this.serverPort}/api/groups`;

  constructor(private http: HttpClient) {}

  getGroups() {
    const path = `${this.researchGroupRouter}/`;
    return this.http.get<ResearchGroup[]>(path);
  }

  getGroup(groupid: string) {
    const path = `${this.researchGroupRouter}/${groupid}`;
    return this.http.get<ResearchGroup>(path);
  }

  addGroup(newResearchGroup: ResearchGroup) {
    const path = `${this.researchGroupRouter}/new`;
    return this.http.post(path, newResearchGroup);
  }

  editGroup(groupid: string, grouptoedit: ResearchGroup) {
    const path = `${this.researchGroupRouter}/${groupid}`;
    return this.http.put(path, grouptoedit);
  }
}
