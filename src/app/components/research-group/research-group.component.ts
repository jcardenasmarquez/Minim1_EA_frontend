import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResearchGroup } from '../../models/researchGroup';
import { ResearchGroupService } from '../../services/research-group.service';

@Component({
  selector: 'app-research-group',
  templateUrl: './research-group.component.html',
  styleUrls: ['./research-group.component.css'],
})
export class ResearchGroupComponent implements OnInit {
  groupsList: ResearchGroup[]; // To storee the list of res. groups
  selectedGroup: ResearchGroup; //To store the group selected to update

  visibleGroup = false;

  addGroupForm = new FormGroup({
    groupNameInput: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    groupDescriptionInput: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    groupLinkInput: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    groupResponsibleInput: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
  });

  editGroupForm = new FormGroup({
    groupNameEdit: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    groupDescriptionEdit: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    groupLinkEdit: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    groupResponsibleEdit: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
  });

  constructor(private researchGroupService: ResearchGroupService) {}

  ngOnInit(): void {
    this.getGroups();
  }

  public getGroups() {
    this.groupsList = [];
    this.selectedGroup = new ResearchGroup();

    this.researchGroupService.getGroups().subscribe((res) => {
      this.groupsList = res as ResearchGroup[];
      console.log(res);
    });
  }

  public getGroup(i: number) {
    this.visibleGroup = false;

    let selectedGroupId = this.groupsList[i]._id;

    this.researchGroupService.getGroup(selectedGroupId).subscribe((res) => {
      this.selectedGroup = res as ResearchGroup;
    });

    this.visibleGroup = true;
  }

  public addGroup() {
    let newGroup = new ResearchGroup();

    newGroup.name = this.addGroupForm.get('groupNameInput').value;
    newGroup.description = this.addGroupForm.get('groupDescriptionInput').value;
    newGroup.link = this.addGroupForm.get('groupLinkInput').value;
    newGroup.responsible = this.addGroupForm.get('groupResponsibleInput').value;

    this.researchGroupService.addGroup(newGroup).subscribe((res) => {
      let addedGroup = res as ResearchGroup;
      if (
        addedGroup.name == newGroup.name &&
        addedGroup.description == newGroup.description &&
        addedGroup.link == newGroup.link &&
        addedGroup.responsible == newGroup.responsible
      )
        alert(`Research Group ${addedGroup.name} added successfully`);
      else alert(`Could not create the group`);
    });
  }

  public editGroup() {
    this.researchGroupService
      .editGroup(this.selectedGroup._id, this.selectedGroup)
      .subscribe((res) => {
        let editedGroup = res as ResearchGroup;
        if (
          editedGroup.name == this.editGroupForm.get('groupNameEdit').value &&
          editedGroup.description ==
            this.editGroupForm.get('groupDescriptionEdit').value &&
          editedGroup.link == this.editGroupForm.get('groupLinkEdit').value &&
          editedGroup.responsible ==
            this.editGroupForm.get('groupResponsibleEdit').value
        )
          alert(`Research Group ${editedGroup.name} updated successfully`);
        else alert(`Could not update the Group`);
        this.visibleGroup = false;
      });
  }
}
