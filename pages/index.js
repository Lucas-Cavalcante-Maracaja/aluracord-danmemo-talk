import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';



function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}


export default function PaginaInicial() {
  const [username, setUsername] = React.useState("Lucas-Cavalcante-Maracaja");
  const [userPhoto, setUserPhoto] = React.useState(username);
  const router = useRouter();
  const [userExists, setUserExist] = React.useState(true);
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[999],
          backgroundImage: 'url(https://static.zerochan.net/Astrea.Record.full.3365134.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
            onSubmit={async function (infosDoEvento){
                infosDoEvento.preventDefault();
                let username = userPhoto;
  
                
                var gitHubUrl = `https://api.github.com/users/${username}`;

                const response = await fetch(gitHubUrl);
                const jsonData = await response.json();
                if (jsonData && jsonData.message !== "Not Found") {
                  router.push({
                    pathname:'/chat',
                    query:{username:userPhoto}
                  });
                }else if (username !== "") {
                    console.log('Username does not exist');
                    setUserExist(false)
                }
                       
               
              }
            }
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>
            {!userExists?
            <Text
              variant="body4"
              
              styleSheet={{
                color: 'red',
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                marginBottom:'4px'
              }}
            >
              Usuário não encontrado
            </Text>
            :""}
            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
              value={username}
              onChange = {async function (event){
                let name = event.target.value;
                setUserExist(true)
                setUsername(name)

                var gitHubUrl = `https://api.github.com/users/${name}`;

                const response = await fetch(gitHubUrl);
                const jsonData = await response.json();
                if (!(jsonData && jsonData.message !== "Not Found") && username !== "") {
                  console.log('Username does not exist');
                  setUserExist(false)
                }

                if(name.length>2){
                  setUserPhoto(name);
                }
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            {userExists?
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${userPhoto+ ".png"}`}
              />
            :""}
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {userPhoto}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}