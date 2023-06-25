import React from 'react';
import { Base} from './Base';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function Create_report() {
  const renderFields = (category) => {
    return (
      <>
        <Form.Group className="mt-4">
          <Form.Label>Resumen:</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Número promedio de horas por semana dedicadas:</Form.Label>
          <Form.Control type="number" />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>Número promedio de horas por semana dedicadas en el interseemestre:</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
      </>
    );
  };

  return (
    <Base>
      <h1>Crear informe</h1>

      
        <Form className="w-50">
          <Form.Group className="mt-4">
            <Form.Label>Tipo de actividad:</Form.Label>
            <Form.Select>
              <option value="docencia">Docencia</option>
              <option value="investigacion">Investigación</option>
              <option value="vinculacion">Vinculación con la sociedad</option>
              <option value="gestion">Gestión educativa</option>
            </Form.Select>
          </Form.Group>

          {renderFields('docencia')} {/* Cambiar 'docencia' por la categoría seleccionada */}

          <Button className="mt-4" variant="primary" type="submit">Enviar</Button>
        </Form>

    </Base>
  );
}