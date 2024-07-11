import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import Navbar from '../components/Navbar';
import './PrivacyPolicy.css'; 

const PrivacyPolicy = () => {
  return (
    <IonPage>
      <Navbar />
      <IonContent className="custom-content" fullscreen style={{ "--ion-background-color": "#F8EBD8" }}>
        <IonGrid>
          <IonRow>
            <IonCol style={{padding:'20px'}}>
              <h1>Privacy Policy</h1>
              <p>
                This privacy policy outlines the data protection measures we have in place to protect your personal information when you visit our website or use our services. By using our website or services, you agree to this privacy policy.
              </p>

              <h2>Data Collection</h2>
              <p>
                We may collect and store your personal information in the following ways:
              </p>
              <ul>
                <li>When you register for an account or create a profile on our website.</li>
                <li>When you submit a form on our website.</li>
                <li>When you participate in our contests, give us feedback, or respond to our emails.</li>
                <li>When you make purchases through our website.</li>
              </ul>

              <h2>Use of Collected Information</h2>
              <p>
                The information collected may be used in the following ways:
              </p>
              <ul>
                <li>To personalize user experience and respond to individual needs.</li>
                <li>To improve our website and customer service based on your information and feedback.</li>
                <li>To process transactions efficiently.</li>
                <li>To administer contests, promotions, surveys, or other site features.</li>
              </ul>

              <h2>Data Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
              </p>

              <h2>Cookies</h2>
              <p>
                We may use cookies to enhance your experience on our site. You can choose to disable cookies through your browser settings, but this may affect your ability to access or use certain features of the site.
              </p>

              <h2>Security Measures</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. We encourage you to periodically review this page for the latest information on our privacy practices.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions regarding this privacy policy, you may contact us using the information below:
              </p>
              <p>
                [Your Contact Information]
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default PrivacyPolicy;
