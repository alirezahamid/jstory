import "./code-editor.css"
import MonacoEditor from "@monaco-editor/react"
interface CodeEditorProps {
  initialValue: string
  onChange(value: any): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  return (
    <div className="editor-wrapper">
      <MonacoEditor
        onChange={onChange}
        value={initialValue}
        language="javascript"
        theme="vs-dark"
        height="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  )
}

export default CodeEditor
