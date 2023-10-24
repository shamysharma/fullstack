
export interface Leave {
    Id: string;
    Name: string;
    Leave_type: string;
    From_date: string;
    To_date: string;
    Team_name: string;
    Reporter: string;
    Sick_leaves_file: string;
    Status: string;
  }

 export interface Notifi {
  Id : string;
  Reporter : string;
  Status : string;
 }

 export interface topfive {
	Name:   string;
	Count:  string; 
}

export interface manager{
	Reporter: string;
  Count:    string; 
}

export interface division {
  map(arg0: (item: any) => any): unknown;
	Team_name:    string; 
  Leave_type:   string; 
	Leave_count:  string; 
}