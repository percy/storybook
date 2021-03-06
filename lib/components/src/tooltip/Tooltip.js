import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoizerific';

import { styled } from '@storybook/theming';

const match = memoize(1000)((requestes, actual, value, fallback = 0) =>
  actual.split('-')[0] === requestes ? value : fallback
);

const ArrowSpacing = 8;

const Arrow = styled.div(
  {
    position: 'absolute',
    borderStyle: 'solid',
  },
  ({ theme, color, placement }) => ({
    marginBottom: `${match('top', placement, '0', ArrowSpacing)}px`,
    marginTop: `${match('bottom', placement, '0', ArrowSpacing)}px`,
    marginRight: `${match('left', placement, '0', ArrowSpacing)}px`,
    marginLeft: `${match('right', placement, '0', ArrowSpacing)}px`,

    bottom: `${match('top', placement, ArrowSpacing * -1, 'auto')}px`,
    top: `${match('bottom', placement, ArrowSpacing * -1, 'auto')}px`,
    right: `${match('left', placement, ArrowSpacing * -1, 'auto')}px`,
    left: `${match('right', placement, ArrowSpacing * -1, 'auto')}px`,

    borderBottomWidth: `${match('top', placement, '0', ArrowSpacing)}px`,
    borderTopWidth: `${match('bottom', placement, '0', ArrowSpacing)}px`,
    borderRightWidth: `${match('left', placement, '0', ArrowSpacing)}px`,
    borderLeftWidth: `${match('right', placement, '0', ArrowSpacing)}px`,

    borderTopColor: match(
      'top',
      placement,
      theme.color[color] || color || theme.color.lightest,
      'transparent'
    ),
    borderBottomColor: match(
      'bottom',
      placement,
      theme.color[color] || color || theme.color.lightest,
      'transparent'
    ),
    borderLeftColor: match(
      'left',
      placement,
      theme.color[color] || color || theme.color.lightest,
      'transparent'
    ),
    borderRightColor: match(
      'right',
      placement,
      theme.color[color] || color || theme.color.lightest,
      'transparent'
    ),
  })
);

const Wrapper = styled.div(
  ({ hidden }) => ({
    display: hidden ? 'none' : 'inline-block',
    zIndex: 2147483647,
  }),
  ({ theme, color, hasChrome, placement }) =>
    hasChrome
      ? {
          marginBottom: `${match('top', placement, ArrowSpacing + 2, 0)}px`,
          marginTop: `${match('bottom', placement, ArrowSpacing + 2, 0)}px`,
          marginLeft: `${match('right', placement, ArrowSpacing + 2, 0)}px`,
          marginRight: `${match('left', placement, ArrowSpacing + 2, 0)}px`,

          background:
            theme.color[color] ||
            color ||
            `linear-gradient(
              -1deg,
              rgba(248, 248, 248, 0.97) 0%,
              rgba(255, 255, 255, 0.97) 100%
            )`,
          filter: `
            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1))
          `,
          borderRadius: theme.borderRadius,
          fontSize: theme.typography.size.s1,
        }
      : {
          marginBottom: `${match('top', placement, 8, 0)}px`,
          marginTop: `${match('bottom', placement, 8, 0)}px`,
          marginLeft: `${match('right', placement, 8, 0)}px`,
          marginRight: `${match('left', placement, 8, 0)}px`,
        }
);

export default function Tooltip({
  placement,
  hasChrome,
  children,
  arrowProps,
  tooltipRef,
  arrowRef,
  color,
  ...props
}) {
  return (
    <Wrapper hasChrome={hasChrome} placement={placement} ref={tooltipRef} {...props} color={color}>
      {hasChrome && <Arrow placement={placement} ref={arrowRef} {...arrowProps} color={color} />}
      {children}
    </Wrapper>
  );
}

Tooltip.propTypes = {
  arrowRef: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  tooltipRef: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
  hasChrome: PropTypes.bool,
  arrowProps: PropTypes.shape({}),
  placement: PropTypes.string,
  color: PropTypes.string,
};
Tooltip.defaultProps = {
  color: undefined,
  arrowRef: undefined,
  tooltipRef: undefined,
  hasChrome: true,
  placement: 'top',
  arrowProps: {},
};
