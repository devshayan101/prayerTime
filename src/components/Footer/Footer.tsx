import { IonFooter,IonButton } from '@ionic/react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
        <IonFooter>
            <center>              
              <a href="https://rzp.io/l/hmBe4L5">

                <IonButton>
                    Donate
                </IonButton>

              </a>            
            </center>
        </IonFooter>
    </div>
  );
};

export default Footer;
