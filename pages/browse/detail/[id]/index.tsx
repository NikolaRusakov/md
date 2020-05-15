import { GetServerSideProps } from 'next';
/** @jsx jsx */
import { jsx } from '@emotion/core';

import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import fetcher from '../../../../lib/fetcher';
import BackIcon from '../../../../static/svg/back.svg';
import { composeQuery } from '../../../../utils';
import AssetDetail from '../../../../src/components/assetDetail';

import { assetsReceived, RootState, wrapper } from '../../../../src/redux/reducers/assets';
import BackButton from '../../../../src/components/backButton';

const mapStateToProps = (state: RootState) => state;

const DetailPage: React.FC<{ initialData: any }> = props => {
  // fixme connect with client store and demonstrate skeleton loading on SSR?
  // const sel = useSelector(state => state);
  // useEffect(() => {
  //   console.log({ sel });
  // }, []);

  const { query } = useRouter();
  const { data, error } = useSWR(composeQuery(`${query.type}/${query.id}`), fetcher, {
    initialData: props.initialData,
  });
  return (
    <section>
      <BackButton>
        {
          <BackIcon
            /*// @ts-ignore*/
            viewBox="0 0 24 24"
            width={48}
            height={48}
            css={{ width: '48px', height: '48px', border: 'none' }}
          />
        }
      </BackButton>
      {data ? (
        <div>
          <AssetDetail {...data} />
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </section>
  );
};
export const getServerSideProps: GetServerSideProps = async context => {
  const initialData = await fetcher(composeQuery(`${context.query.type}/${context.query.id}`));
  return { props: { initialData } };
};

export default wrapper.withRedux(DetailPage);
