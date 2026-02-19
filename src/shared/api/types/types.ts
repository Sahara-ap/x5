export type TIncidentsListResponse = {
  items: { id: string; title: string }[];
};

export type TIncidentDetailsResponse = {
  incident: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
    reporter: string;
  };
  notes: { id: string; message: string; createdAt: string }[];
};
