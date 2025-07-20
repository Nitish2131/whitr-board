import React from 'react'
import { Tldraw, getSnapshot, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import supabase from '../util/superbase';
import { useParams } from 'react-router';

function CollabComp() {
    function Toolbar() {
        let { roomId } = useParams()
        const editor = useEditor();
        const save = async () => {
            const Snapshot = getSnapshot(editor.store)
        console.log('Room ID:', roomId)
            
            console.log(Snapshot);
            alert('content saved')
        
        try {

            const { data, error } = await supabase
                .from('white-boards')
                .insert([
                    { key:roomId,json:Snapshot },
                ])
                .select()

                if(data){
                    alert('save success')

                }else{
                    alert(error)
                }


        } catch (err) {
            console.log(err);

        }
    }

        return (
            <div style={{ pointerEvents: "all" }}>
                <button onClick={save}>save data</button>

            </div>
        )
    }

    return (
        <div style={{ position: 'fixed', inset: 0 }}>
            <Tldraw components={{
                SharePanel: () => <Toolbar />
            }} />
        </div>

    )
}
export default CollabComp