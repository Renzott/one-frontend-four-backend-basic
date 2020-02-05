using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication3.Models;

namespace server_api.Interface
{
    interface PhotoInterface
    {

        IEnumerable<Photo> listadoFotos();

        Photo buscarPhoto(int id);

        string insertarFoto(Photo reg);

        string modificarFoto(Photo reg, int id);

        string borrarFoto(int id);

    }
}
