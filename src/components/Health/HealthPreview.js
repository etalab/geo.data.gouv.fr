import React, { Component } from 'react'
import { find } from 'lodash'
import { Link } from 'react-router'
import { isObsolete, isNoneType, isNotSync, isNotEnoughDownloadable, isNotEnoughOpen, isAlmostNotOpen, isAlmostNotDownloadable } from '../../helpers/catalogs'
import { card, success, warning, error } from './HealthPreview.css'

const warningChecks = [isObsolete, isNoneType, isNotEnoughDownloadable, isNotEnoughOpen]
const errorChecks = [isNotSync, isAlmostNotDownloadable, isAlmostNotOpen]

class HealthPreview extends Component {
  checks() {
    const { catalog } = this.props
    const warnings = warningChecks.map(check => check(catalog))
    const errors = errorChecks.map(check => check(catalog))

    if (find(errors, (check) => check === true)) return error
    if (find(warnings, (check) => check === true)) return warning

    return success
  }

  render() {
    const { catalog } = this.props
    const health = this.checks()
    let icon, msg

    if (health === success) {
      icon = 'checkmark'
      msg = 'Tout va bien'
    } else if (health === warning) {
      icon = 'warning'
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
