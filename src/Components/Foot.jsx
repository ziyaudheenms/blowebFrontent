import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function Foot() {
  return (
    <MDBFooter backgroundColor='dark' className='text-center text-lg-left'>
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase text-light'>Footer Content</h5>
            <p className='text-light'>
              Here you can add your footer content, such as links, copyright information, and more.
            </p>
          </MDBCol>
          {/* Add more columns here if needed */}
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}
