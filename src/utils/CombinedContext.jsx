export default function CombinedContext(...providers) {

    return ({children}) => {

        return providers.reduceRight((accumulator, CurrentProvider) => {

            return <CurrentProvider> { accumulator } </CurrentProvider>

        }, children)

    }

}