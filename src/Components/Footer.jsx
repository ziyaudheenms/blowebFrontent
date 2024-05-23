import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import '../App.css'
export default function Footer() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
      
      <section className='py-3 ' style={{borderTop:'2px solid #302f2f'}}>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className=' mb-4 fs-1 jersey-25-regular' style={{color: 'rgb(238, 64, 93)'}}>
                <MDBIcon icon="gem" className="me-3 fs-1" />
                Bloweb
              </h6>
              <p className='text-light'>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-light'>Products</h6>
              <p>
                <a href='#!' className='text-light'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-light'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-light'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-light'>
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-light'>Useful links</h6>
              <p>
                <a href='#!' className='text-light'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-light'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-light'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-light'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-light'>Contact</h6>
              <p>
                <a href='#!' className='text-light'>
                 Bloweb@example.cok
                </a>
              </p>
              <p>
                <a href='#!' className='text-light'>
                  help@Bloweb.com
                </a>
              </p>
              <p>
                <a href='#!' className='text-light'>
                  +91 234-567-400
                </a>
              </p>
              <p>
                <a href='#!' className='text-light'>
                  ceo@bloweb.com
                </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 text-light' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='fs-2 fw-bold jersey-25-regular' style={{color: 'rgb(238, 64, 93)'}} href='https://mdbootstrap.com/'>
          Bloweb.com
        </a>
      </div>
    </MDBFooter>
  );
}