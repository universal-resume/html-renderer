import { ParseError, ParseIssue, SingleOrNonEmpty } from "effect/ParseResult"

function isSingle<T>(value: SingleOrNonEmpty<T>): value is T {
    return !Array.isArray(value)
}

export const formater = (error: ParseError): string => {

    function dig(issue: ParseIssue, path: string[], depth: number = 0) {
        if (depth > 2) {
            return { path: [], message: "ERROR", depth }
        }
        console.log(issue)
        if (issue._tag === 'Composite') {
            // Check if issues array is empty or undefined
            if (!issue.issues || (Array.isArray(issue.issues) && issue.issues.length === 0)) {
                return { path, message: "Composite error with no sub-issues", depth }
            }
            // If it's a single issue, use it directly
            if (isSingle(issue.issues)) {
                return dig(issue.issues, path, depth + 1)
            }
            // If it's an array, use the first issue
            if (Array.isArray(issue.issues) && issue.issues.length > 0) {
                return dig(issue.issues[0], path, depth + 1)
            }
            // Fallback
            return { path, message: "Composite error", depth }
        }
        if (issue._tag === 'Pointer') {
            return dig(issue.issue, [...path, issue.path.toString()], depth + 1)
        }
        if (issue._tag === 'Missing') {
            return { path, message: "Missing", depth }
        }
        return { path: [], message: "ERROR", depth }
    }

    const { path, message } = dig(error.issue, [])

    return `${message} "${path.join(" > ")}" property`
}