export default function TestPage(id: any) {
    console.log(id);
    return (
        <div>
            Test {id.params.id}
        </div>
    )
}