import React from 'react'
import { Tldraw, getSnapshot, useEditor, loadSnapshot } from 'tldraw'
import 'tldraw/tldraw.css'
import supabase from '../util/superbase'
import { useParams } from 'react-router'

function CollabComp() {
    let { roomId } = useParams();
    function Toolbar() {
      const editor = useEditor();
  
      async function checkIfKeyIsPresent() {
        try {
            let { data , error } = await supabase
            .from('whiteboards')
            .select("*")
            .eq("key", roomId);
          if (data) {
            return data;
          }
          return;
        } catch (err) {
          console.log(err);
        }
      }
  
      async function save() {
        const snapshot = getSnapshot(editor.store);
        try {
          const prevData = await checkIfKeyIsPresent();
          console.log(prevData)
          if (prevData && prevData.length > 0) {
            const { data, error } = await supabase
              .from("whiteboards")
              .update({ json: JSON.stringify(snapshot) })
              .eq('key', roomId)
              .select();
            if (data) {
              alert("Update Success");
            }
            return;
          }
          const { data, error } = await supabase
            .from("whiteboards")
            .insert([{ key: roomId, json: JSON.stringify(snapshot) }])
            .select();
          if (data) {
            alert("Save Success");
          } else {
            alert(error);
          }
        } catch (err) {
          console.log(err);
        }
      }
      return (
        <div style={{ pointerEvents: "all" }}>
          <button onClick={save}>Save Data</button>
        </div>
      );
    }
  
    async function loadData(editor) {
      try {
        let { data, error } = await supabase
          .from("whiteboards")
          .select("*")
          .eq("key", roomId);
        if (data && data[0]) {
          console.log(data);
          loadSnapshot(editor.store, JSON.parse(data[0]?.json));
        }
      } catch (err) {
        console.log(err);
      }
    }
    return (
      <div style={{ position: "fixed", inset: 0 }}>
        <Tldraw
          components={{
            SharePanel: () => <Toolbar />,
          }}
          onMount={(editor) => {
            loadData(editor);
          }}
        />
      </div>
    );
  }
  
  export default CollabComp;
  