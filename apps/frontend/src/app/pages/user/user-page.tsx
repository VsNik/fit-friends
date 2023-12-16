import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Role } from '@fit-friends/shared';
import { AppLayout } from '../../components/layouts/app-layout';
import { UserCardUser } from '../../components/user-card/user-card-user/user-card-user';
import { ButtonFloat } from '../../components/ui/button-float/button-float';
import { UserCardCoach } from '../../components/user-card/user-card-coach/user-card-coach';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserAction } from '../../store/user/async-actions';
import { MapPopup } from '../../components/popups/map-popup/map-popup';
import { RouteName } from '../../constants/route';
import { Modal } from '../../components/ui/modal/modal';
import { CertificatesPopup } from '../../components/popups/certificates-popup/certificates-popup';
import { Loader } from '../../components/loader/loader';
import { LoadStatus } from '../../constants/common';
import * as userSelector from '../../store/user/user-select';

export const UserPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  
  const [openMap, setOpenMap] = useState<boolean>(false);
  const [openCertificates, setOpenCertificates] = useState<boolean>(false);  
  
  const user = useAppSelector(userSelector.user);
  const loadStatus = useAppSelector(userSelector.loadStatus);
  const isLoading = loadStatus === LoadStatus.Loading;

  useEffect(() => {
    if (params.id) {
      dispatch(fetchUserAction(params.id));
    } 
  }, [dispatch, params]);

  const handleOpenMap = () => setOpenMap(true);
  const handleCloseMap = () => setOpenMap(false);
  const handleOpenCertificates = () => setOpenCertificates(true);
  const handleCloseCertificates = () =>setOpenCertificates(false);

  return (
    <AppLayout>
      <div className="inner-page inner-page--no-sidebar">
        {isLoading && <Loader />}

        <div className="container">
          <div className="inner-page__wrapper">
            <ButtonFloat text="Назад" icon="arrow-left" className="inner-page__back" onClick={() => navigation(RouteName.Home)} />
            <div className="inner-page__content">

              {user.role === Role.User &&
                <UserCardUser user={user} onOpenMap={handleOpenMap} isLoading={isLoading} />
              }
              {user.role === Role.Coach &&
                <UserCardCoach user={user} onOpenMap={handleOpenMap} onOpenCertificatePopup={handleOpenCertificates} />
              }
              
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={openMap} onClose={handleCloseMap} dataTestId='modal-map-component'>
        <MapPopup onClose={handleCloseMap} title={user?.name} location={user?.location} />
      </Modal>

      {user.role === Role.Coach && (
        <Modal isOpen={openCertificates} onClose={handleCloseCertificates} dataTestId='certificate-modal-component'>
          <CertificatesPopup title="Сертификаты" onClose={handleCloseCertificates} certificates={user?.certificate} />
        </Modal>
      )}

    </AppLayout>
  );
};
