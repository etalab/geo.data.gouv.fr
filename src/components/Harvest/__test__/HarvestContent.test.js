import React from 'react'
import { shallow } from 'enzyme'
import HarvestContent from '../HarvestContent'
import HarvestResults from '../HarvestResults'
import HarvestLogs from '../HarvestLogs'
import harvests from '../../../fetch/__test__/harvests.json'

describe('<HarvestContent />', () => {

  it('should render HarvestResults component', () => {
    const wrapper = shallow(<HarvestContent successful={true} logs={harvests[0].log} />)
    expect(wrapper.containsMatchingElement(<HarvestResults />)).toBe(true)
  })

  it('should render HarvestLogs component', () => {
    const wrapper = shallow(<HarvestContent successful={false} logs={harvests[1].log} />)
    expect(wrapper.containsMatchingElement(<HarvestLogs />)).toBe(true)
  })

})
