import React, { Component } from 'react'
import extend from 'lodash/extend'
import { SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar } from 'searchkit'
import './index.css'

const host = "https://caf3aea8feb74aa88e8bcc156454e4ed.us-east-1.aws.found.io:9243/carrier-lookup"
const searchkit = new SearchkitManager(host, {
    basicAuth: 'readonly:readonly'
  })

const CarrierListItem = (props)=> {
  const {bemBlocks, result} = props
  const source = extend({}, result._source, result.highlight)
  return (
    <div className="result-row" data-qa="hit">
      <span className="code" dangerouslySetInnerHTML={{__html:source.code}}></span>
      <span className="carrier" dangerouslySetInnerHTML={{__html:source.carrier}}></span>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <SearchBox autofocus={true} searchOnChange={true} prefixQueryFields={["code^10", "carrier"]}/>
          </TopBar>

        <LayoutBody>

          <LayoutResults>
            <ActionBar>

              <ActionBarRow>
                <HitsStats translations={{
                  "hitstats.results_found":"{hitCount} results found"
                }}/>
              </ActionBarRow>

            </ActionBar>
            <ViewSwitcherHits
                hitsPerPage={12} highlightFields={["code", "carrier"]}
                hitComponents={[
                  {key:"list", title:"List", itemComponent:CarrierListItem, defaultOption:true},
                ]}
                scrollTo="body"
            />
            <NoHits suggestionsField={"carrier"}/>
            <Pagination showNumbers={true}/>
          </LayoutResults>

          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;
