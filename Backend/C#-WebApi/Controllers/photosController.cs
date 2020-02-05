using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using MySql.Data.MySqlClient;
using server_api.Service;
using WebApplication3.Models;

namespace server_api.Controllers
{

    [EnableCors(origins:"*",headers: "*",methods: "*")]
    public class photosController : ApiController
    {

        PhotoService ps = new PhotoService();
        
        // GET api/photos
        public IHttpActionResult Get()
        {
            return Ok(ps.listadoFotos());
        }

        // GET api/photos/${id}
        public IHttpActionResult Get(int id)
        {
            return Ok(ps.buscarPhoto(id));
        }

        // POST api/photos/
        public IHttpActionResult Post([FromBody]Photo reg)
        {
            return Ok(ps.insertarFoto(reg));
        }

        // DELETE api/photos/${id}
        public IHttpActionResult Delete(int id)
        {
            return Ok(ps.borrarFoto(id));
        }

        // PUT api/photos/${id}
        public IHttpActionResult Put([FromBody]Photo reg,int id)
        {
            return Ok(ps.modificarFoto(reg,id));
        }

    }
}
