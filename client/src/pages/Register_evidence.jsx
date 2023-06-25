import React from 'react';
import { Base } from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function Register_evidence() {
  return (
    <Base>
    <h1>Registrar Evidencia</h1>
    <Form className="w-50">
        <Form.Group className="mt-4">
          <Form.Label>Tipo de actividad:</Form.Label>
          <Form.Select>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
            <option value="opcion4">Opción 4</option>
          </Form.Select>
        </Form.Group>

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
          <Form.Label>Documentos de respaldo:</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">Enviar</Button>
      </Form>
    </Base>
  );
}
