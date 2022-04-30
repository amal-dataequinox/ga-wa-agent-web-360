// ----------------------------------------------------------------------

export type Customer = {
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  contactNumber: string;
  accountId: string;
  accountVerified: boolean;
  enabled: boolean;
  createTime: Date;
  updateTime: Date;
  userRoles: UserRole[];
  account: Account;
  };
  
  export type Account  ={
    accountId: string;
    accountName: string;
    createTime: Date;
    updateTime: Date;
}

export type UserRole  ={
  userRoleId: string;
  userId: string;
  roleId: number;
  role: Role;
}

export type Role   ={
  roleId: number;
  roleName: string;
  description: string;
  roleAuthorities: RoleAuthority[];
}

export type RoleAuthority    ={
  roleAuthorityId: number;
  roleId: number;
  authorityId: number;
  authority: Authority;
}

export type Authority     ={
  authorityId: number;
  authorityName: string;
  description: string;
}