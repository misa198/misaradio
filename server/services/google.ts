import { Response } from 'express';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

export const getGoogleUserProfile = async (
  accessToken: string,
  callback: (email: string, name: string, err: boolean) => void,
) => {
  const oauth2Client = new OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  });
  oauth2.userinfo.get((err, res) => {
    if (err) callback('email', '', true);
    else if (res) {
      const { email, name, picture } = res.data;
      if (email && name) callback(email, name, false);
      else callback('email', '', true);
    } else callback('email', '', true);
  });
};
