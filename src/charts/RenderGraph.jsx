/** eslint verified */
import React from 'react';
import { ParentSize } from '@vx/responsive';
import GraphLoader from './GraphLoader';

/**
 * Function to render a graph
 *
 * @param {any} data Graph data, it can be null (data hasn't loaded), false (data not available)
 *  or an Object with the data.
 * @param {string} labelX axis X label
 * @param {string} labelY axis Y label
 * @param {string} graph graph type
 * @param {string} graphTitle graph title
 * @param {array} colors colors to sort elements inside the graph
 */
const RenderGraph = (data, labelX, labelY, graph, graphTitle, colors) => {
  // While data is being retrieved from server
  let errorMessage = null;
  if (data === null) errorMessage = 'Loading data...';
  else if (!data) errorMessage = `Data for ${graphTitle} not available`;
  if (errorMessage) {
    // TODO: ask Cesar to make this message nicer
    return (
      <div className="errorData">
        {errorMessage}
      </div>
    );
  }
  return (
    <ParentSize className="nocolor">
      {parent => (
        parent.width && (
          <GraphLoader
            width={parent.width}
            height={parent.height}
            graphType={graph}
            data={data}
            labelX={labelX}
            labelY={labelY}
            graphTitle={graphTitle}
            colors={colors}
          />
        )
      )}
    </ParentSize>
  );
};

export default RenderGraph;
