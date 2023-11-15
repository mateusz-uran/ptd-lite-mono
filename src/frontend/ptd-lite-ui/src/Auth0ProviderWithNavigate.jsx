import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneMail } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const Auth0ProviderWithNavigate = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENTID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return (
      <>
        <div id="first_layer">
          <div className="info-wrapper">
            <h3>{t("misc.errorFirstPageInfo")}</h3>
            <span>
              <AiTwotoneMail className="icon" />
              <a href="mailto: ptdlite@gmail.com">ptdlite@gmail.com</a>
            </span>
            <button
              className="secondary-btn"
              onClick={() => window.location.reload(false)}
            >
              {t("buttons.refresh")}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        useRefreshTokens: true,
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};
export default Auth0ProviderWithNavigate;
