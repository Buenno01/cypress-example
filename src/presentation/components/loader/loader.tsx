import React from 'react'
import Styles from './loader-styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Loader: React.FC<Props> = (props: Props) => {
  return (<div data-testid="loader" className={[Styles.loader, props.className].join(' ')}><div /><div /><div /><div /><div /><div /><div /><div /></div>)
}

export default Loader
