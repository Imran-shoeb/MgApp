﻿using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using ReportManagement.Model.User;
using System.Net.Http;
using System.Web.Http;

namespace ReportManagement.Controllers
{
    public class BaseApiController : ApiController
    {
        private ModelFactory _modelFactory;
        private ApplicationUserManager _appUserManager;
        private ApplicationRoleManager _appRoleManager;

        protected ApplicationUserManager AppUserManager
        {
            get { return _appUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
        }

        protected ApplicationRoleManager AppRoleManager
        {
            get { return _appRoleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>(); }
        }

        public BaseApiController()
        {
        }

        protected ModelFactory TheModelFactory
        {
            get
            {
                if (_modelFactory == null)
                {
                    _modelFactory = new ModelFactory(this.Request, this.AppUserManager);
                }

                return _modelFactory;
            }
        }

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // no ModelState errors are available to send, so just return and empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}