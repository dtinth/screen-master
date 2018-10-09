import enableHotReload from 'enable-hot-reload'
import React from 'react'
import { Editor } from './Editor'

const hot = enableHotReload(module)
export const EditorContainer = hot(React, Editor)
