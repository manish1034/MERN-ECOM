import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function CommonForm({formControls, formData, setFormData, onSubmit, buttonText}) {
    function renderInputsByType(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || "";
        switch(getControlItem.componentType) {
            case "input":
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
                    />
                );
                break;
            case "select":
                element = (
                    <Select 
                        onValueChange={(value) => setFormData({...formData, [getControlItem.name]: value})} 
                        value={value}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem.options &&
                                getControlItem.options.length > 0 ?
                                getControlItem.options.map(optionItem => (
                                    <SelectItem value={optionItem.value} key={optionItem.id}>{optionItem.label}</SelectItem>
                                ))
                            : null}
                        </SelectContent>
                    </Select>
                );
                break;
            case "textarea":
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
                    />
                );
                break;
            default:
                element = (
                    <Input
                        type={getControlItem.type}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
                    />
                );
                break;
        }
        return element;
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls.map(controlItem => (
                        <div className="grid w-full gap-1.5" key={controlItem.name}>
                            <Label className="mb-1">{controlItem.label}</Label>
                            {
                                renderInputsByType(controlItem)
                            }
                        </div>
                    ))}
            </div>
            <Button className="w-full mt-2" type="submit">{buttonText || "Submit"}</Button>
        </form>
    )
}

export default CommonForm;