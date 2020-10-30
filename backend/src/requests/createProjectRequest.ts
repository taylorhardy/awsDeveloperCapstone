export interface CreateProjectRequest {
    projectId?: string
    projectName: string
    assignedTo: string
    statusName: string
    startDate: string
    endDate: string
    notes: string
    createdBy?: string
  }
  