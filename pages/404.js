import { useRouter } from 'next/router'
import React from 'react';
import { Box, Text, Button } from '@skynexui/components';
import appConfig from '../config.json';

export default function ErrorPage(){
    const router = useRouter()
    return (
        <>
              <Box
                styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[999],
                backgroundImage: 'url(https://64.media.tumblr.com/900eac8cd306213953d6cdd2af799d39/3ef557d02cf9c757-b9/s2048x3072/7da38d4d49707f2020ae95416e2e52a979a20700.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >

            <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: {
                        xs: 'column',
                        sm: 'row',
                        },

                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                    >
                      <Box
                        as="form"
                        styleSheet={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                         textAlign: 'center',
                        }}
                        onSubmit={function (infosDoEvento){
                            infosDoEvento.preventDefault();
                            router.push({
                            pathname:'/',
                            });
                        }
                        }>
                        
                        <Text
                        variant="body1"
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[200],
                            backgroundColor: appConfig.theme.colors.neutrals[900],
                            padding: '3px 10px',
                            borderRadius: '1000px',
                            margin: '10px'
                        }}
                        >
                        Não foi possível encontrar esse usuário, por favor retorne a página inicial.
                        </Text>
                        <Button
                            type='submit'
                            label='Voltar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            />
                    </Box>

                   
                    
                </Box>
            </Box>
        </>
    )
}
