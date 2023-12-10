import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiUrl } from '../../Consts.tsx';
import authService from '../auth/AuthorizeService.tsx';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";

const RemovePolProductModal = ({ isVisible, setVisible, cell, setCell, name, id, ...args}) => {
    const [errorMsg, setErrorMsg] = useState("")

    const handleRemove = async () => {
        try {
            const response = await fetch(ApiUrl + `/api/polprodukt/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await authService.getJwtToken()
                },
                body: JSON.stringify({ "productId": id }),
            });

            if (response.ok) {
                console.log('Polproduct updated successfully');
                cell.getRow().delete();
                setErrorMsg("");
                setVisible(false);
            } else {
                console.error('Failed to update polproduct');
                setErrorMsg("Failed to update polproduct")
            }
        } catch (error) {
            console.error('Error updating polproduct:', error);
            setErrorMsg(`Error updating polproduct: ${error}`)
        }
    };
    
    return (
      <Modal isOpen={isVisible} toggle={()=>setVisible(!isVisible)} onClosed={()=>setErrorMsg("")} {...args}>
        <ModalHeader toggle={()=>setVisible(!isVisible)}>Czy na pewno chcesz usunąć produkt?</ModalHeader>
        <ModalBody>
          <p className="fs-5">Półprodukt o nazwie: {name} zostanie usunięty.</p>
          <p className="fs-6">Czy jesteś tego pewny?</p>
          {errorMsg && <p className='text-danger'>{errorMsg}</p>}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={()=>handleRemove()}>
            Usuń
          </Button>{' '}
          <Button color="secondary" onClick={()=>setVisible(false)}>
            Anuluj
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

export default RemovePolProductModal;
