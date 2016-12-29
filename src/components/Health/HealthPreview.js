import React, { Component } from 'react'
import { find } from 'lodash'
import { Link } from 'react-router'
import { isObsolete, isNoneType, isNotSync, isNotEnoughDownloadable, isNotEnoughOpen, isAlmostNotOpen, isAlmostNotDownloadable } from '../../helpers/catalogs'
import { card, good, warning, bad } from './HealthPreview.css'

const warningChecks = [isNoneType, isNotEnoughDownloadable, isNotEnoughOpen, isNotSync]
const badChecks = [isObsolete, isAlmostNotDownloadable, isAlmostNotOpen]

class HealthPreview extends Component {
  checks() {
    const { catalog } = this.props
    const warnings = warningChecks.map(check => check(catalog))
    const bads = badChecks.map(check => check(catalog))

    if (find(bads, (test) => test === true)) return bad
    if (find(warnings, (test) => test === true)) return warning

    return good
  }

  render() {
    const { catalog } = this.props
    const health = this.checks()
    let icon, msg

    if (health === good) {
      icon = 'checkmark'
      msg = 'Tout va bien'
    } else if (health === warning) {
      icon = 'warning sign'
      msg = 'À surveiller'
    } else {
      icon = 'remove circle'
      msg = 'Des erreurs sont présentes'
    }

    return (
      <Link className={`${card} ${health}`} to={`/catalogs/${catalog._id}/health`}>
        <i className={`${icon} icon`}></i>{msg}
      </Link>
    )
  }
}

export default HealthPreview
