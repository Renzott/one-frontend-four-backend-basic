import { Request, Response } from "express";

import pool from "../database";

class PhotosController {
  public async list(req: Request, res: Response): Promise<void> {
    const lstPhotos = await pool
      .then(conn => {
        return conn.query("select * from photos");
      })
      .then(rows => {
        return rows;
      });
    res.status(200).json(lstPhotos);
  }

  public async find(req: Request, res: Response): Promise<any> {
    let response = "";
    var id = parseInt(req.params.id);

    if (!isNaN(id)) {
      const foundPhoto = await pool.then(conn => {
        return conn.query(`select * from photos where id = ${id}`);
      });

      if (foundPhoto.length > 0) {
        return res.status(200).json(foundPhoto[0]);
      } else {
        response = "No se ha encontrado el ID";
      }
    } else {
      response = "El id recibido no es un numero";
    }

    return res.status(404).json({ message: response });
  }

  public async create(req: Request, res: Response): Promise<void> {
    await pool
      .then(conn => {
        return conn.query("INSERT INTO photos set ?", [req.body]);
      })
      .then(
        response => {
          console.log(response);
        },
        reject => {
          console.log("\x1b[31m" + reject);
        }
      );

    res.status(200).json({ message: "Juego Guardado" });
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;

    await pool.then( conn => {
      conn.query('update photos set ? where id = ?', [req.body,id])
    })

    res.status(200).json({ text: `Actualizar juego ${req.params.id}` });
  }

  public async delete(req: Request, res: Response): Promise<any> {
    let response = "";
    var id = parseInt(req.params.id);

    if (!isNaN(id)) { 
      const foundPhoto = await pool.then(conn => {
         conn.query(`delete from photos where id = ${id}`);
         return res.status(200).json({ text: `Borrado juego ${req.params.id}` });
      });

    } else {
      response = "El id recibido no es un numero";
    }

    return res.status(404).json({ message: response });
  }
}

export const photosController = new PhotosController();
