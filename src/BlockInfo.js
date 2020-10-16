import React, { useEffect, useState } from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';

export default function Main (props) {
  const { api, keyring } = useSubstrate();
  const [blockInfo, setBlockInfo] = useState({});

  useEffect(() => {
    let unsubscribeAll = null;

    api.rpc.chain.subscribeNewHeads((header) => {
      console.log(111, header.number.toHuman());
      console.log(header);
      setBlockInfo([
        { name: 'number', value: header.number.toNumber() },
        { name: 'hash', value: header.hash.toHuman() },
        { name: 'parentHash', value: header.parentHash.toHuman() },
        { name: 'stateRoot', value: header.stateRoot.toHuman() },
        { name: 'extrinsicsRoot', value: header.extrinsicsRoot.toHuman() }
      ]);
    });

    return () => unsubscribeAll && unsubscribeAll();
  }, [api, keyring, setBlockInfo]);


  return (
    <Grid.Column>
      <h1>Current Block Info</h1>
      <Table celled striped size='small'>
        <Table.Body>
          { blockInfo && blockInfo[0] ? blockInfo.map(info =>
            <Table.Row key={info.name}>
              <Table.Cell width={3} textAlign='right'>{info.name}</Table.Cell>
              <Table.Cell width={3}>{info.value}</Table.Cell>
            </Table.Row>
          ) :
            <Table.Row></Table.Row>
          }
        </Table.Body>
      </Table>
    </Grid.Column>
  );
}