import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import Grid from '@material-ui/core/Grid';
import { GoMail } from 'react-icons/go';
import { BsFillPeopleFill } from 'react-icons/bs';
import Profile from './Profile';
import ProfileManager from './ProfileManager';
import Ask from './Ask';
import InboxDM from './InboxDM';

const Main: React.FC = () => {
  const { profiles, profile, askList, askListFull, inbox } = useContext(
    ApiContext
  );
  // TODO:型を確定させる
  const filterProfiles = profiles.filter((prof: any) => {
    return prof.id !== profile.id;
  });
  // TODO:型を確定させる
  const listProfiles =
    filterProfiles &&
    filterProfiles.map((filprof: any) => (
      // TODO:型を確定させる
      <Profile
        key={filprof.id}
        profileData={filprof}
        askData={askListFull.filter((ask: any) => {
          return (
            filprof.userPro === ask.askFrom || filprof.userPro === ask.askTo // TypeScriptの場合には「|」は使用できないため、「||」にする
          );
        })}
      />
    ));
  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="app-profiles">
          <div className="task-list">{listProfiles}</div>
        </div>
      </Grid>

      <Grid item xs={4}>
        <div className="app-details">
          <ProfileManager />
        </div>
        <h3 className="title-ask">
          {' '}
          <BsFillPeopleFill className="badge" />
          Approval request list
        </h3>
        <div className="app-details">
          <div className="task-list">
            <ul>
              {
                // TODO:型を確定させる
                profile.id &&
                  askList.map((ask: any) => (
                    <Ask
                      key={ask.id}
                      ask={ask}
                      // TODO:型を確定させる
                      prof={profiles.filter((item: any) => {
                        return item.userPro === ask.askFrom;
                      })}
                    />
                  ))
              }
            </ul>
          </div>
        </div>
      </Grid>

      <Grid item xs={4}>
        <h3>
          <GoMail className="badge" />
          DM Inbox
        </h3>
        <div className="app-dms">
          <div className="task-list">
            <ul>
              {
                // TODO:型を確定させる
                profile.id &&
                  inbox.map((dm: any) => (
                    <InboxDM
                      key={dm.id}
                      dm={dm}
                      // TODO:型を確定させる
                      prof={profiles.filter((item: any) => {
                        return item.userPro === dm.sender;
                      })}
                    />
                  ))
              }
            </ul>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Main;
