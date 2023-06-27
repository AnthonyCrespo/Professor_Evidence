import React from 'react';
import { Base } from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {ActivitiesType} from '../components/ActivitiesType'


export function Registered_evidences() {
  return (
    <Base>
    <h1>Evidencias Registradas</h1>
    <Form className="w-50">
{/*         <Form.Group className="mt-4">
          <Form.Label>Tipo de actividad:</Form.Label>
          <Form.Select>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
            <option value="opcion4">Opción 4</option>
          </Form.Select>
        </Form.Group> */}

        <ActivitiesType/>

        <Form.Group className="mt-4">
          <Form.Label>Evidencia:</Form.Label>
          <Form.Select>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
            <option value="opcion4">Opción 4</option>
            <option value="opcion5">Opción 5</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Semestre:</Form.Label>
          <Form.Select>
            <option value="opcion1">SEM0223</option>
            <option value="opcion2">SEM0123</option>
            <option value="opcion3">SEM0222</option>
            <option value="opcion4">SEM0123</option>
          </Form.Select>
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">Enviar</Button>
      </Form>
    </Base>
  );
}
