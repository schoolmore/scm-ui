import * as React from "react";
import { useRef, useState } from "react";


export interface IDraggableOffset {
    /** Delta de déplacement horizontale */
    x : number,
    /** Delta de déplacement verticale */
    y : number,
}

export interface IUseDraggable {
    /** Indique si le déplacement est actif, oui par défaut */
    enabled? : boolean,
}

export interface IUseDraggableResult {
    /** Déplacement à appliquer à l'élément via transform: translate() */
    offset      : IDraggableOffset,
    /** Handlers à poser sur la poignée de déplacement */
    handleProps : React.HTMLAttributes<HTMLElement>,
}

const useDraggable = ( {
    enabled=true,
}: IUseDraggable = {} ) : IUseDraggableResult => {

    const [offset, setOffset] = useState<IDraggableOffset>({ x : 0, y : 0 });
    // Position du curseur au début du drag, moins l'offset déjà appliqué
    const start = useRef<IDraggableOffset>({ x : 0, y : 0 });

    const onPointerDown = (e : React.PointerEvent<HTMLElement>) : void => {
        if (e.button !== 0) return;
        // La capture redirige tous les pointermove vers la poignée, même hors de celle-ci
        e.currentTarget.setPointerCapture(e.pointerId);
        start.current = { x : e.clientX - offset.x, y : e.clientY - offset.y };
    }

    const onPointerMove = (e : React.PointerEvent<HTMLElement>) : void => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
        setOffset({ x : e.clientX - start.current.x, y : e.clientY - start.current.y });
    }

    return {
        offset,
        handleProps : enabled ? { onPointerDown, onPointerMove } : {},
    };

}

export default useDraggable;
