export interface IGroup {
    groupname: string;
    groupdescription: string;
    admin: any;
    private: boolean;
    pinnedmessage: string;
    members: string[];
    newMember?:string
    _id: any;
}
