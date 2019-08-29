import React from 'react';
import { Box, themed } from '@deity/falcon-ui';

export const FooterSectionLayout = themed({
  tag: Box,
  defaultTheme: {
    footerSection: {
      p: 'md',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      css: {
        minWidth: 250,
        textAlign: {
          md: 'unset',
          xs: 'center'
        },
        alignItems: {
          md: 'unset',
          xs: 'center'
        }
      }
    }
  }
});
