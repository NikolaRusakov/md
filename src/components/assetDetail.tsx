/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useRouter } from 'next/router';
import { mq } from '../utils/theme';
import Link from 'next/link';
import VideoButton from './videoButton';
import { assetTitleOrName, imageOrPlaceholder } from '../../utils';
import { Badge, Flex, TopBadge, Span, Pill } from './styled';
import dayjs from 'dayjs';
import CalendarIcon from '../../static/svg/calendar.svg';
import { Asset } from '../../types';

const AssetDetail: React.FC<Asset> = props => {
  const router = useRouter();
  return (
    <div
      css={mq({
        display: 'flex',
        flexDirection: ['column', 'row', 'row'],
        justifyContent: 'space-evenly',
        overflow: 'hidden',
        position: 'relative',
      })}>
      <div
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          width: ['100%', '60%', '50%'],
          order: [1, 0, 0],
        })}>
        <h1
          css={theme =>
            mq({
              fontWeight: theme.fontWeights.bold,
              fontSize: [theme.fontSizes[5], theme.fontSizes[6], theme.fontSizes[8]],
            })
          }>
          {assetTitleOrName(props)}
        </h1>
        {props.tagline && (
          <h3
            css={theme =>
              mq({
                maxWidth: ['100%', '100%', '66%'],
                fontSize: [theme.fontSizes[4], theme.fontSizes[5], theme.fontSizes[6]],
              })
            }>
            {props.tagline}
          </h3>
        )}

        {props.type && (
          <TopBadge>
            <Span fontSize={[4, 5, 6]}>{props.type}</Span>
          </TopBadge>
        )}

        <Flex display="flex" py={2}>
          {props.popularity && (
            <Pill width={'auto'} alignItems="center" height={'auto'} fontSize={4}>
              #{props.popularity.toFixed(0)}
            </Pill>
          )}

          {props.vote_average && (
            <TopBadge
              height={['auto', 'auto', 'auto']}
              width={['auto', 'auto', '1/4']}
              maxWidth="1/5"
              fontSize="3"
              borderRadius="lg"
              color="orange.1"
              bg="orange.6"
              flex={0.25}
              px={[2, 2, 2]}
              alignItems="center"
              flexDirection={['column', 'column', 'row']}
              justifyContent="space-evenly"
              display="flex">
              <span>Rating</span>
              <Span color="black" fontSize={[3, 4, 5]}>
                {props.vote_average}
              </Span>
            </TopBadge>
          )}
          {props.release_date && (
            <Span flex={[0.4, 0.35, 0.25]} css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CalendarIcon
                /*// @ts-ignore*/
                viewBox="0 0 24 24"
                width={48}
                height={48}
                css={theme => ({ width: '28px', height: '28px', border: 'none', stroke: theme.colors.blue[9] })}
              />
              <span> {dayjs(props.release_date).format('MMMM M , YYYY')}</span>
            </Span>
          )}
        </Flex>

        <p css={theme => mq({ fontSize: theme.fontSizes[4], maxWidth: ['90%', '80%', '80%'] })}>{props.overview}</p>

        {/* solved by https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component*/}
        <Link
          href={{ pathname: `/browse/detail/[id]/video` }}
          as={{ pathname: `/browse/detail/${router.query.id}/video` }}
          passHref>
          <VideoButton />
        </Link>
        {/* TODO make a section prettier*/}
        {props?.genres && props.genres.length > 0 && (
          <div>
            <h2>Genres</h2>
            <div css={{ display: 'flex' }}>
              {props.genres.map(({ name }, i) => (
                <Badge key={`${name}-${i}`}>{name}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        css={mq({
          overflow: 'hidden',
          position: 'relative',
          width: ['100%', '40%', '50%'],
          margin: [0, 'auto', 0],
          display: 'flex',
          justifyContent: 'center',
          order: [0, 1, 1],
        })}>
        <img
          css={mq({
            position: ['relative', 'relative', 'absolute'],
            top: 0,
            left: 0,
            width: ['67%', '67%', '80%'],
            height: ['auto', 'auto', '100%'],
            cursor: 'pointer',
          })}
          src={imageOrPlaceholder(props.poster_path)}
        />
      </div>
    </div>
  );
};

export default AssetDetail;
