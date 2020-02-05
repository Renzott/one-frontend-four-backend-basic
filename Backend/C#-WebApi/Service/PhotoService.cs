using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using server_api.Interface;
using WebApplication3.Models;

namespace server_api.Service
{
    public class PhotoService : PhotoInterface
    {

        MySqlConnection cn = new MySqlConnection(ConfigurationManager.ConnectionStrings["mySqlCon"].ConnectionString);

        public string borrarFoto(int id)
        {
            string mensaje = "";

            cn.Open();
            try
            {
                MySqlCommand cmd = new MySqlCommand("delete from photos where id = @id;", cn);

                cmd.Parameters.AddWithValue("@id", id);

                int q = cmd.ExecuteNonQuery();

                if (q > 0)
                    mensaje = "Se ha borrado la foto con el id:" + id;
                else
                    mensaje = "No se ha afectado ninguna fila";

                cn.Close();
            }
            catch(MySqlException e)
            {
                mensaje = e.Message;
            }
            finally
            {
                cn.Close();
            }

            return mensaje;

        }

        public Photo buscarPhoto(int id)
        {
            Photo findPhoto = listadoFotos().Where(x => x.id == id).FirstOrDefault();

            return findPhoto;
        }

        public string insertarFoto(Photo reg)
        {
            string mensaje = "";

            cn.Open();
            try
            {
                MySqlCommand cmd = new MySqlCommand("insert into photos values(default, @tit, @des, @img, default)", cn);

                cmd.Parameters.AddWithValue("@tit", reg.title);
                cmd.Parameters.AddWithValue("@des", reg.description);
                cmd.Parameters.AddWithValue("@img", reg.image);

                int q = cmd.ExecuteNonQuery();

                if (q > 0)
                    mensaje = "Se ha creado una Foto con el id " + reg.id;
                else
                    mensaje = "No se ha afectado ninguna fila";

                cn.Close();
            }
            catch (MySqlException e)
            {
                mensaje = e.Message;
            }
            finally
            {
                cn.Close();
            }

            return mensaje;
        }

        public IEnumerable<Photo> listadoFotos()
        {
            List<Photo> temporal = new List<Photo>();

            MySqlCommand cmd = new MySqlCommand("select * from photos;", cn);

            cn.Open();

            MySqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                Photo reg = new Photo
                {
                    id = dr.GetInt32(0),
                    title = dr.GetString(1),
                    description = dr.GetString(2),
                    image = dr.GetString(3),
                    create_at = dr.GetDateTime(4)
                };

                temporal.Add(reg);

            }

            dr.Close(); cn.Close();

            return temporal;
        }

        public string modificarFoto(Photo reg, int id)
        {
            string mensaje = "";

            cn.Open();
            try
            {
                MySqlCommand cmd = new MySqlCommand("update photos set title = @tit, description = @des, image = @img where id = @id;", cn);

                cmd.Parameters.AddWithValue("@tit", reg.title);
                cmd.Parameters.AddWithValue("@des", reg.description);
                cmd.Parameters.AddWithValue("@img", reg.image);

                cmd.Parameters.AddWithValue("@id", id);

                int q = cmd.ExecuteNonQuery();

                if (q > 0)
                    mensaje = "Se ha modificado una Foto con el id " + reg.id;
                else
                    mensaje = "No se ha afectado ninguna fila";

                cn.Close();
            }
            catch (MySqlException e)
            {
                mensaje = e.Message;
            }
            finally
            {
                cn.Close();
            }

            return mensaje;
        }
    }
}