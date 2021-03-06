﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReportManagement.Model.User
{
    public class UserInfo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobTitle { get; set; }
        public string Address { get; set; }
        public string Address_PostCode { get; set; }
        public string Sex { get; set; }
        
        // For distinguishing different types of user profile
        public bool IsEmployeeProfile { get; set; }

        // for determining ex-employees
        public bool IsActiveEmployee { get; set; }
        public byte[] Photo { get; set; }

        [Key, ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
