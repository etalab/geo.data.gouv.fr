import React from 'react'
import { Link } from 'react-router'
import LastHarvesting from '../LastHarvesting/LastHarvesting'
import Statistics from '../Statistics/Statistics'
import Percent from '../Statistics/Percent/Percent'
import './Catalog.css'

const Catalog = ({catalog}) => {
  const metricsFake = {"totalCount":663,"counts":{"organizations":{"Métropole de Lyon / Direction Innovation Numérique et Systèmes d'Information (DINSI)":280,"Métropole de Lyon / Direction Innovation Numérique et Systèmes d'Information (DINSI) (Géomatique et données métropolitaines)":226,"Métropole de Lyon / Direction Planification et politique d'agglomération (DPPA)":44,"Métropole de Lyon / Direction de la voirie (DV)":24,"SYTRAL":14,"VILLE DE LYON / DSIT / Service Opérations":13,"Air Rhône-Alpes":13,"Métropole de Lyon / Direction de l'eau (DE)":11,"Métropole de Lyon / Direction de la propreté (DP)":10,"Ville de Chassieu":7,"Rhônexpress":3,"SYTRAL (Administrateur OpenData TCL)":3,"Métropole de Lyon/ Direction Innovation Numérique et Systèmes d'Information (DINSI)":3,"Métropole de Lyon / Direction Innovation Numérique et Systèmes d'Information(DINSI) (Géomatique et données métropolitaines)":2,"Aéroports de Lyon (Aéroports de Lyon)":2,"Métropole de Lyon / Direction des assemblées et vie de l'institution (Gestion et animation des assemblées)":2,"Métropole de Lyon/ Direction Innovation Numérique et Systèmes d'Information (DINSI) (Géomatique et données métropolitaines)":2,"Q-Park France":2,"Rhônexpress (Administrateur opendata)":2,"Métropole de Lyon / Direction Territoire et Cohésion Métropolitaine (TCM)":2},"keywords":{"données ouvertes":636,"imageryBaseMapsEarthCover":216,"Ortho-imagerie":193,"Occupation des terres":168,"Services d'utilité publique et services publics":88,"Localisation":74,"Imagerie":68,"planningCadastre":65,"Réseaux de transport":56,"location":38,"Zones de gestion, de restriction ou de réglementation et unités de déclaration":37,"Bâtiments":33,"transportation":29,"Santé et sécurité des personnes":17,"Adresses":17,"Usage des sols":15,"Conditions atmosphériques":15,"health":15,"boundaries":15,"Parcelles cadastrales":14}},"partitions":{"recordType":{"dataset":424,"nonGeographicDataset":239},"dataType":{"none":241,"vector":211,"grid":211},"openness":{"yes":638,"not-determined":25},"download":{"yes":559,"not-determined":104}}}
  return (
      <Link to={`catalog/${catalog.id}`}>
        <div className="ui segment">
          <LastHarvesting harvest={catalog.lastHarvesting}/>
          <div className="ui equal width grid container">
            <div className="column">
              <span className="ui large header">{catalog.name}</span>
            </div>
            <div className="column"></div>
            <div className="column"><Percent metrics={metricsFake} label="openness" icon="users" size="small" /></div>
            <div className="column"><Percent metrics={metricsFake} label="download" icon="download" size="small" /></div>
            <div className="column"><Statistics value={catalog.lastHarvesting.recordsFound} size="small" label="Entries" /></div>
          </div>
        </div>
      </Link>
  )
}

export default Catalog
